export type ITodo = {
  id: number,
  state: string,
  author_association: string,
  created_at: string,
  closed_at: string,
  title: string,
  comments: number,
};

export type IData = {
  backlog: Object[],
  todo: Object[],
  done: Object[],
}
