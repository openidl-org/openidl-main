username=$1
password=$2
database=$3
host=$4
port=$5
#aws rds create-db-instance --db-name stat_reporting --db-instance-identifier stat-reporting --allocated-storage 20 --db-instance-class db.t4g.large --engine postgres --profile aais-prod-antley  --region us-east-1 --master-username $username --master-user-password $password>>deploy.log
# https://www.postgresql.org/docs/9.1/app-psql.html
#schema
psql -h $host -U $username -d $database -p $port au_premium.sql
#loss
#views

#ep function
#cy function
# auto_outstanding
#auto incurred count function
#auto incurred loss function
#users load_user, reporting_user, - load_user -> grant write to the base tables, reporting user, grant permisison to write to ep schema, and read from all tables both schema, plus call the functions. 
