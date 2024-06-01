interface Orth {
  _: string;
  $: {
    extent: string;
    opt: string;
  };
}

interface Bibl {
  _: string;
  $: {
    n: string;
    default: string;
    valid: string;
  };
}

interface EntryFree {
  _: string;
  $: {
    key: string;
    type: string;
    opt: string;
  };
  orth: Orth;
  bibl: Bibl[];
}

interface Div1 {
  $: {
    type: string;
    n: string;
    org: string;
    sample: string;
  };
  entryFree: EntryFree;
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