#
# SPDX-License-Identifier: Apache-2.0
#
echo ${HOST_NAME}

# updating host name in Dockerfile
sed -i 's/${HOST_NAME}/'$HOST_NAME'/g' ${DOCKER_ROOT}/deployment.yml
sed -i 's/${CLUSTER_NAME}/'$CLUSTER_NAME'/g' ${DOCKER_ROOT}/deployment.yml
cat ${DOCKER_ROOT}/deployment.yml

sed -i 's/${HOST}/'$HOST'/g' ./server/config/channel-config.json
echo "CHANNEL CONFIG"
cat ./server/config/channel-config.json

# Add GitLab token to package.json files
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package.json
sed -i 's/${GITHUB_TOKEN}/'$GITHUB_TOKEN'/g' package-lock.json
echo "Printing package.json"
cat  package.json

# s3Bucket or mongo or cloudant
sed -i 's|env_target_db|'$TARGET_DB'|g' server/config/DBConfig.json