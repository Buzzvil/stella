{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "stella.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create unified labels for stella components
*/}}
{{- define "stella.common.matchLabels" -}}
app.kubernetes.io/name: {{ include "stella.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "stella.common.metaLabels" -}}
helm.sh/chart: {{ include "stella.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "stella.booksvc.labels" -}}
{{ include "stella.booksvc.matchLabels" . }}
{{ include "stella.common.metaLabels" . }}
{{- end -}}

{{- define "stella.booksvc.matchLabels" -}}
app.kubernetes.io/component: {{ .Values.booksvc.name | quote }}
{{ include "stella.common.matchLabels" . }}
{{- end -}}

{{- define "stella.gatewaysvc.labels" -}}
{{ include "stella.gatewaysvc.matchLabels" . }}
{{ include "stella.common.metaLabels" . }}
{{- end -}}

{{- define "stella.gatewaysvc.matchLabels" -}}
app.kubernetes.io/component: {{ .Values.gatewaysvc.name | quote }}
{{ include "stella.common.matchLabels" . }}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "stella.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create a fully qualified booksvc name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "stella.booksvc.fullname" -}}
{{- if .Values.booksvc.fullnameOverride -}}
{{- .Values.booksvc.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- printf "%s-%s" .Release.Name .Values.booksvc.name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s-%s" .Release.Name $name .Values.booksvc.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create a fully qualified gatewaysvc name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "stella.gatewaysvc.fullname" -}}
{{- if .Values.gatewaysvc.fullnameOverride -}}
{{- .Values.gatewaysvc.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- printf "%s-%s" .Release.Name .Values.gatewaysvc.name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s-%s" .Release.Name $name .Values.gatewaysvc.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "stella.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
