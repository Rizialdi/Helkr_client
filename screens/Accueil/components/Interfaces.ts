export type CategoriesInterface = CategoryInterface[];

export interface CategoryInterface {
  id: string;
  name: string;
  tag: { [key: string]: Tag };
  image: IconSvg;
}

export type IconSvg = 'house' | 'student';

interface Tag {
  referenceId: string;
  pieces: number[];
  detailQuestions: DetailQuestion;
}

interface DetailQuestion {
  [key: string]: LabelValue[];
}

interface LabelValue {
  label: string;
  value: string;
}
