type MetaProps = {
    title: string;
    description?: string;
    keywords?: string[];
}

export function createMetadata({
    title,
    description = "Shop the latest in fashion, electronics, and more.",
    keywords = ["Ezalia24", "Shopping", "Ecommerce"]}: MetaProps) {
    return {
      title,
      description,
      keywords: keywords.join(', '),
    };
  }
  