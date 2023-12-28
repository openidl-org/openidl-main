copy_config_files:
	./copy-config-files.sh

apply_secrets:
	node apply-secrets.js
	
copy_secrets:
	./copy-config-files.sh
	node apply-secrets.js

set_environment:
	node set-environment.js
	
load_insurance_data:
	node load-insurance-data.js

load_data_calls:
	node load-data-calls.js

load_extraction_patterns:
	node load-extraction-patterns.js

bootstrap:
	node load-insurance-data.js
	node load-extraction-patterns.js
	node load-data-calls.js

