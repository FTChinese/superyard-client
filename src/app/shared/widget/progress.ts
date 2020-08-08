export enum LoadingState {
  Progress = 'progress',
  Success = 'success',
  NotFound = 'not_found',
  Error = 'error'
}

// LoadingResult describes the UI state changes when loading data from server.
// A loading process generally has 3 states:
// 1. loading: this could be indicated the LoadingResult itself being undefined;
// 2. finished and not found: LoadingResult exists, but value misses and notFound is true.
// 3. finished and found. LoadingResult exists, and value exists.
export interface LoadingResult<T> {
  value?: T;
  notFound?: boolean;
}

// Build a LoadingResult from value of type T.
export function loadingResult<T>(value?: T): LoadingResult<T> {
  if (!value) {
    return {
      notFound: true
    };
  }

  return {
    value,
  };
}
