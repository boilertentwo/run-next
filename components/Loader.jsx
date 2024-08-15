"use client"

import {useState, useEffect} from "react"

import { Progress } from "@/components/ui/progress"

export default function Progresser() {
  const [progress, setProgress] = useState(23)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="h-[6px] w-full bg-yellow-500" />
}
