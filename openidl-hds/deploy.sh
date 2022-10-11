username=$1
password=$2
aws rds create-db-instance --db-name stat_reporting --db-instance-identifier stat-reporting --allocated-storage 20 --db-instance-class db.t4g.large --engine postgres --profile aais-prod-antley  --region us-east-1 --master-username $username --master-user-password $password>>deploy.log
