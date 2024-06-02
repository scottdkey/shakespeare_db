interface EntryFree {
  _: string,
  $: EntryFreeMeta,
  orth: Orth,
  bibl?: Bibl[],
  emph?: string[],
  cit?: Cit[]
}

interface Cit {
  quote: string,
  bibl: Bibl
}

interface Div1 {
  $: EntryMeta,
  entryFree: EntryFree
}

interface EntryMeta {
  type: string,
  n: string,
  org: string,
  sample: string
}

interface EntryFreeMeta {
  key: string,
  type: string,
  opt: string,
}

interface Orth {
  _: string,
  $: {
    extend: string,
    opt: string
  }
}

interface Bibl {
  _: string,
  $: {
    n: string,
    default: "YES" | "NO",
    valid: "yes" | "no"
  }
}

interface Body {
  div1: Div1;
}

interface Text {
  body: Body;
}

interface TEI2 {
  'TEI.2': {
    text: Text;
  };
}