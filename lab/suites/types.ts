export type Status = 'pass' | 'fail' | 'not_built' | 'info';
export interface Case { suite: string; id: string; status: Status; detail?: string }
export interface SuiteResult { suite: string; cases: Case[]; metrics: Record<string, number | string> }
export const mk = (suite: string) => (id: string, ok: boolean, detail?: string): Case => ({ suite, id, status: ok ? 'pass' : 'fail', detail });
