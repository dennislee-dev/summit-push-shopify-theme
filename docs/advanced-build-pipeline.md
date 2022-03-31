# Advanced Build Pipeline 

When deploying themes using the new Shopify to Github Integration, we need to keep the repository root with the same structure than Shopify needs. This means we can't use a `theme` directory like we used before. This is way we have to change things a bit: 

1. We no longer use Themekit. 
2. We no longer use deployments through Themekit. 
3. Changes made to the customizer will impact the repository. 
4. We can't build anything during the deployment process becuase Shopify doesn't support that. 

So now, the way we will automate this is by creating a Github Action that creates a publishable version after pushing to the repo. This action pulls the content, compiles the assets, and pushes things back to the same branch, keeping compiled versions of the assets. 

The following example is prepared to run using Laravel Mix. Modify as required. 

```yaml 
name: Build Assets
on:
  push:
    branches: [main]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '16.x'   
      - name: Compile assets
        run: |
          npm install
          npx mix --production
      - name: Commit Build
        run: |
          git config --global user.name 'Andrés Smerkin'
          git config --global user.email 'asmerkin@users.noreply.github.com'
          git commit -am "[Bot] Assets built for commit $GITHUB_SHA"
          git push
```