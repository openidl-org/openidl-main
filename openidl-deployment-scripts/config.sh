# SPDX-License-Identifier: Apache-2.0
#!/bin/bash

ID=$(id -u)
USER=7051
AAIS_RESULT='buildnetworkresult.txt'
CARRIER_RESULT='joinnetworkresult.txt'

# Certificate Name Static Array - aais, carrier and analytics
ANALYTICS=(openidl-HOST-data-call-app-ibp-2.0 openidl-data-call-mood-listener-ibp-2.0 openidl-transactional-data-event-listener-ibp-2.0)
AAIS_CARRIER=(openidl-HOST-data-call-app-ibp-2.0 openidl-HOST-insurance-data-manager-ibp-2.0 openidl-HOST-data-call-processor-ibp-2.0)
ENROLL='enroll'
REGISTER='register'