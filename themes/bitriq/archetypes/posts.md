---
title: "{{ replace .Name "-" " " | title }}"
description: {{ .Site.Params.description }}
author: {{ .Site.Params.author }}
email: {{ .Site.Params.email }}
date: {{ .Date }}
draft: false
tags: [""]
---

