import { marked } from 'marked';

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export const renderMarkdown = (content: string): string => {
  if (!content) return '';
  
  // Convert markdown to HTML
  const html = marked.parse(content);
  return html as string;
};

export const stripMarkdown = (content: string): string => {
  if (!content) return '';
  
  // Simple markdown stripping for plain text
  return content
    .replace(/#{1,6}\s*/g, '') // Remove heading markers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
    .replace(/`(.*?)`/g, '$1') // Remove code markers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove link markdown
    .trim();
};