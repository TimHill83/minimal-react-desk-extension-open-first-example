// Target Usage:
// <Modal>
//<SomeComponement />
//<SomeOtherComponent />
//</Modal >

export type ParentData<T> = {
  parentWidget: string;
  data?: T;
};
