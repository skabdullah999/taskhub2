interface Step {
  title: string
  description: string
}

interface HowItWorksProps {
  steps: Step[]
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            {index + 1}
          </div>
          <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
