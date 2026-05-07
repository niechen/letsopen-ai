type FreshnessData = {
  pubDate: Date;
  updatedDate?: Date | null;
};

type ContentWithFreshness = {
  data: FreshnessData;
};

export function getFreshnessDate(data: FreshnessData) {
  return data.updatedDate ?? data.pubDate;
}

export function getFreshnessIso(data: FreshnessData) {
  return getFreshnessDate(data).toISOString();
}

export function compareFreshnessDesc(a: ContentWithFreshness, b: ContentWithFreshness) {
  return getFreshnessDate(b.data).valueOf() - getFreshnessDate(a.data).valueOf();
}
