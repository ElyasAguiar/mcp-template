export interface FetchPrometheusMetricParams {
  metric_name: string;
  service_name: string;
}

// MCP response types
export interface McpTextContent {
  type: "text";
  text: string;
  [key: string]: unknown;
}

export interface McpImageContent {
  type: "image";
  data: string;
  mimeType: string;
  [key: string]: unknown;
}

export interface McpResourceContent {
  type: "resource";
  resource: {
    text: string;
    uri: string;
    mimeType?: string;
    [key: string]: unknown;
  } | {
    uri: string;
    blob: string;
    mimeType?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export type McpContent = McpTextContent | McpImageContent | McpResourceContent;

export interface McpResponse {
  content: McpContent[];
  _meta?: Record<string, unknown>;
  isError?: boolean;
  [key: string]: unknown;
} 