import { assertEquals } from 'testing/asserts.ts'

Deno.test('1 + 1 は 2 である', () => {
  // 1 + 1 は 2 であることを確かめる
  assertEquals(1 + 1, 2)
})
