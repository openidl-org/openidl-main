# SPDX-License-Identifier: Apache-2.0
# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json
sed -i 's/"env-pageSize"/'$PAGE_SIZE'/g' ./server/config/default.json

# read config for mongo or cloudant
sed -i 's|env_target_db|'$TARGET_DB'|g' server/config/DBConfig.json

echo "Printing package.json"
cat  package.json

cat ./server/config/default.json

#using ${HOST_NAME} env variable for name
sed -i 's/${HOST_NAME}/'$HOST_NAME'/g' ${DOCKER_ROOT}/deployment.yml
sed -i 's/${CLUSTER_NAME}/'$CLUSTER_NAME'/g' ${DOCKER_ROOT}/deployment.yml
echo "PRINTING DEPLOYMENT FILE"
cat deployment.yml

sed -i 's/${HOST}/'$HOST'/g' ./server/config/listener-channel-config.json
sed -i 's/${HOST}/'$HOST'/g' ./server/config/target-channel-config.json
echo $UNIQUE_IDENTIFIERS > ./server/config/unique-identifiers-config.json
cat ./server/config/unique-identifiers-config.json
sed -i 's|env-appName|'$APP_PREFIX'|g' server/config/default.json