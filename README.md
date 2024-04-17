# Backstage
An open platform for building developer portals. [Official documentation](https://backstage.io/docs/overview/what-is-backstage)

# Getting started
* example of catalog-info.yaml to add a service and an API to backstage: https://github.com/coretech/boss-retail-webreceipt-service/blob/sandbox/catalog-info.yaml
* official specification of catalog-info.yaml file: https://backstage.io/docs/features/software-catalog/descriptor-format/
* use QA env for API resources to point to (e.g. open api specification aka swagger)

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

# Deployment & URL
* Backstage is deployed to on-prem cluster 
* Prod Url: https://backstage.ra.idt.net/
* Non-prod Url: https://backstage-np.ra.idt.net/
* Auth: via github

# Run locally
```sh
yarn install
yarn dev
```

# CI/CD
* Jenkins pipeline: https://jenkins-np.ra.idt.net/job/DevOps/job/backstage/
* [Jenkins file](Jenkinsfile)

# Configuration
* Prod
    * [Config file](app-config.yaml)
        * [PostgreSql](app-config.yaml#L30)
        * [Github Auth Provider](app-config.yaml#L63)
        * [Github Autodiscovery](app-config.yaml#L69)

* Non-prod
    * [Config file](app-config.np.yaml)
        * [PostgreSql](app-config.np.yaml#L30)
        * [Github Auth Provider](app-config.np.yaml#L63)
        * [Github Autodiscovery](app-config.np.yaml#L69)
* Secrets: 
  * Prod vault: core - team_devops - backstage
  * Non-prod vault: core - team_devops - backstage
    

# Docker image
* ECR registry: `833915412828.dkr.ecr.us-east-1.amazonaws.com/backstage-app`
* ECR repository: backstage-app
* Tags: `{docker label version}` (example: 833915412828.dkr.ecr.us-east-1.amazonaws.com/backstage-app:1.0.0)


