# Backstage
An open platform for building developer portals. [Official documentation](https://backstage.io/docs/overview/what-is-backstage)

# How-to add a service / api to backstage
* example: https://github.com/coretech/boss-retail-webreceipt-service/blob/sandbox/catalog-info.yaml


# Deployment & URL
* Backstage is deployed to `Boss Retail Dev` account
* Infrastructure as code: https://github.com/coretech/rcs-iac-apps/blob/master/src/lib/stacks/dev/rcs-dev-backstage-stack.ts
* Url: https://backstage.retail-dev.bossrevolution.com/
* Auth: via github

# Run locally
```sh
yarn install
yarn dev
```

# CI/CD
* Jenkins pipeline: https://jenkins.ra.idt.net/job/Boss/job/RCS/job/backstage-app/
* [Jenkins file](Jenkinsfile)

# Configuration
* [Config file](app-config.np.yaml)
  * [PostgreSql](app-config.np.yaml#L30)
  * [Github Auth Provider](app-config.np.yaml#L63)
  * [Github Autodiscovery](app-config.np.yaml#L69)
* Secrets: Boss Retail Dev account -> Secrets Manager -> rcs-dev-backstage

# Docker image
* ECR registry: `470427355418.dkr.ecr.us-east-1.amazonaws.com`
* ECR repository: backstage-app
* Tags: `{jenkins_build_number}`, `latest` (example: 470427355418.dkr.ecr.us-east-1.amazonaws.com/backstage-app:17)

# catalog-info.yaml
## specification
https://backstage.io/docs/features/software-catalog/descriptor-format/

## tags
:warning: **Backstage doesn't support key-value tags, they have only single-string tags. The tag column below is just to provide clarity**

:warning: **Tag should follow the following format: a string that is sequences of [a-z0-9+#] separated by [-]**
| tag | possible values |
|-----|-----------------|
| visibility (access from the Internet) | public \| private |
| programming language | dotnet \| go \| java \| c++ \| perl \| ruby \| python \| typescript \| dart \| etc |
| framework version *(optional)* | dotnet-7 \| go-1 \| java-15 \| etc |
| frontend framework *(optional)* | angular \| react \| knockout \| etc |
| OS | windows \| linux |
| OS/Distro version | windows-server-2019 \| centos-7 \| amazon-linux-2 \| etc | 
| lob | [full list](https://docs.google.com/spreadsheets/d/1o7Oy9Wv5ATXiwpkx5BZbxyXDRXEKQn9zNaNPc6iDI2M/edit#gid=0) |
| compute *(optional)* | ec2 \| lambda \| ecs \| eks \| k8s \| vm \| |
| infrastructure-as-code | terra-live \| terraform \| cdk \| cloudformation |
| hosting | aws \| gcp \| azure \| on-prem |
| observability | nr \| xray \| prometheus \| cloudwatch \| splunk \| etc |
| development phase | active-development \| support \| deprecated |


