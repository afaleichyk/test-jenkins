import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubEntityProvider, GithubOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.setProcessingIntervalSeconds(1800); // 30 mins
  builder.addProcessor(new ScaffolderEntitiesProcessor());

  builder.addEntityProvider(
    GithubOrgEntityProvider.fromConfig(env.config, {
      id: 'coretech',
      orgUrl: 'https://github.com/coretech',
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 60 },
        timeout: { minutes: 5 },
      }),
    }),
    GithubEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 60 },
        timeout: { minutes: 15 },
      }),
      scheduler: env.scheduler,
    }));
    const { processingEngine, router } = await builder.build();
    await processingEngine.start();
    return router;
};
