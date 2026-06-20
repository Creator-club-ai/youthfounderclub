export async function appendSubmissionRow(row: string[]): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    throw new Error("SHEETS_WEBHOOK_URL 환경변수가 설정되지 않았습니다.");
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row }),
  });
  if (!res.ok) {
    throw new Error(`Sheets webhook 실패: ${res.status}`);
  }
}
