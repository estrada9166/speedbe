#!/bin/sh
command -v now >/dev/null 2>&1 || { npm install -g now >&2; exit 1; }