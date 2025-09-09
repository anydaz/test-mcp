import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getUpcomingEvents } from "./tools/getUpcomingEvents.js";
import z from "zod";
import { getEventSeat } from "./tools/getEventSeat.js";

const server = new McpServer({
  name: "ASJ MCP Server",
  version: "1.0.0"
});

server.registerTool(
  'get_upcoming_events',
  {
    title: "Get Upcoming Events",
    description: "Fetch a list of upcoming events from the Aula Simfonia API.",
  },
  async () => {
    const events = await getUpcomingEvents();
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(events, null, 2)
        }
      ]
    };
  }
);

server.registerTool(
  'get_event_seats',
  {
    title: "Get Event Seats",
    description: "Tool to get event seats from Aula Simfonia API. requires the event slug as input.",
    inputSchema: {
      eventSlug: z.string().describe('The slug identifier for the event to retrieve seat information.')
    }
  },
  async ({ eventSlug }) => {
    const eventSeats = await getEventSeat(eventSlug);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(eventSeats, null, 2)
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Aula Simfonia MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
