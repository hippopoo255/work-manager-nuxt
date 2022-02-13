type ProcessFlag = 1 | 2 | 3 | null

export interface MeetingDecisionInputs {
  id?: number
  flag?: ProcessFlag
  subject: string
  body: string
  written_by: number
  decided_by: null | number
}
