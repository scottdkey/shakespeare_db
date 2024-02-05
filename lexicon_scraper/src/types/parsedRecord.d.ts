interface XmlEntry {
  "#text": string;
}

interface BiblEntry {
  "#text": string;
  ":@": {
    "@_": {
      "@_n": string;
      "@_default": string;
      "@_valid": string;
    };
  };
}

interface OrthEntry {
  "#text": string;
  ":@": {
    "@_": {
      "@_extent": string;
      "@_opt": string;
    };
  };
}

interface EmphEntry {
  "#text": string;
}

interface HiEntry {
  "#text": number;
  ":@": {
    "@_": {
      "@_rend": string;
    };
  };
}

interface EntryFreeEntry {
  orth: OrthEntry[];
  "#text": string | EmphEntry | HiEntry | BiblEntry;
  ":@": {
    "@_": {
      "@_key": string;
      "@_type": string;
      "@_opt": string;
    };
  };
}

interface Div1Entry {
  entryFree: EntryFreeEntry[];
  ":@": {
    "@_": {
      "@_type": string;
      "@_n": string;
      "@_org": string;
      "@_sample": string;
    };
  };
}

interface BodyEntry {
  div1: Div1Entry[];
  ":@": {
    "@_": {
      "@_type": string;
      "@_n": string;
      "@_org": string;
      "@_sample": string;
    };
  };
}

interface TextEntry {
  body: BodyEntry[];
}

interface TEI2Entry {
  text: TextEntry[];
}

interface ParsedRecord {
  TEI2: TEI2Entry[];
}