# SPDX-License-Identifier: Apache-2.0
#!/usr/bin/env bash

function error_exit {
  echo "${1:-"Unknown Error"}" 1>&2
  exit 1
}