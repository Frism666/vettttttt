
export interface VeteranData {
  name: string;
  rankBranch: string;
  dob: string;
  dod: string;
  cemetery: string;
  cemeteryAddress: string;
  telephone: string;
  biography?: string;
  serviceHighlights?: string[];
  sourceOrigin?: string; // Field baru untuk validitas sumber
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResult {
  veterans: VeteranData[];
  sources: GroundingChunk[];
}
