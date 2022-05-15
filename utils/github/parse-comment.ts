// returns a key value set of environment

export default function (comment:string) {
    const [initial,...rest] = comment.replace(/Last Updated .*/g,"").split(/\*\*(.*?)\*\*/g)
    let environmentValues: Record<string, {enabled:boolean, value: any, segment?: string}[]> = {}
    let currentEnvironment = ''
    let currentSegment = ''
    rest.forEach((v, i)=>{
        const isEnvironment = !!((i+1)%2)//every odd split is an environment
        if(isEnvironment) {
            const parts = v.split(' - ')
            currentSegment = parts[1]
            currentEnvironment = parts[0];
        } else {
            const enabled = v.includes("[x]")
            // "\n- [x] Enabled\n```undefined\n<div/>\n```\n\n" --> '<div/>'
            environmentValues[currentEnvironment] = environmentValues[currentEnvironment] || []
            const value = v.includes('```') ? v.replace(/.*?\`\`\`.*?\n/s,"").replace(/```.*/s,"").trimEnd() : null
            environmentValues[currentEnvironment].push({enabled:enabled, segment: currentSegment, value})
        }
    })

    return environmentValues
}
