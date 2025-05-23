import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_CONFIG } from './config/api.ts';
import { helloWorldTool } from './tools/hello.ts';
import { prometheusTool } from './tools/prometheusTool.ts';

/**
 * Initialize the MCP server and register all tools
 */
async function initializeServer() {
  // Create server instance
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
    description: SERVER_CONFIG.description,
  });

  // Register tools
  server.tool(
    helloWorldTool.name,
    helloWorldTool.description,
    helloWorldTool.parameters,
    helloWorldTool.handler
  );

  server.tool(
    prometheusTool.name,
    prometheusTool.description,
    prometheusTool.parameters,
    prometheusTool.handler
  );
  return server;
}

/**
 * Main entry point
 */
async function main() {
  // Initialize the server
  const server = await initializeServer();

  // Connect to stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // console.error for claude-desktop so it won't process this output
  console.error("Hello World MCP Server running on stdio");
}

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 
