#!/bin/bash
babel --extensions '.js,.ts,.tsx' --ignore **/*.story.js,**/*.story.ts,**/*.story.d.ts,**/*.story.tsx,**/*.spec.js,**/*.spec.ts,**/*.test.js,**/*.test.ts,**/__tests__/**,**/__unpublished__/** --root-mode upward --source-maps true src -d lib --copy-files --no-copy-ignored