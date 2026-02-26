import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Config = {
  packageManager: "npm" | "yarn" | "pnpm" 
}

const configAtom = atomWithStorage<Config>("config", {
  packageManager: "pnpm",
})

export function useConfig() {
  return useAtom(configAtom)
}