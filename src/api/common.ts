export interface RequestState<T> {
  loading: boolean;
  error?: string | null;
  data: T | null;
}
