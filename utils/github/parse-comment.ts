// returns a key value set of environment

import {IEnvironments} from "../flagsmith/api/fetch-environments";
import {ISegments} from "../flagsmith/api/fetch-segments";
import mockedConstants from "../mockedConstants";

type IEnvironmentValues = { enabled: boolean, environment: number, environmentKey: string, value: any, segment?: number }

// parses a flagsmith bot comment and returns the feature values, environment and segments
export default function (comment: string, environments: IEnvironments, segments: ISegments) {
    const [initial, ...rest] = comment.replace(/Last Updated .*/g, "").split(/\*\*(.*?)\*\*/g)
    let environmentValues: IEnvironmentValues[] = []
    let currentEnvironmentKey: string | undefined = undefined
    let currentEnvironment: number | undefined = undefined
    let currentSegment: number | undefined = undefined
    rest.forEach((v, i) => {
        const isEnvironment = !!((i + 1) % 2)//every odd split is an environment
        if (isEnvironment) {
            const parts = v.split(' - ')
            currentSegment = parts[1] ? segments.results.find((v) => v.name === parts[1])?.id : undefined
            currentEnvironmentKey = environments.results.find((v) => v.name === parts[0])?.api_key;
            currentEnvironment = environments.results.find((v) => v.name === parts[0])?.id;
        } else {
            const env = environments.results.find((v) => v.api_key === currentEnvironmentKey)
            const enabled = v.includes("[x]")
            // "\n- [x] Enabled\n```undefined\n<div/>\n```\n\n" --> '<div/>'
            const value = v.includes('```') ? v.replace(/.*?```.*?\n/s, "").replace(/```.*/s, "").trimEnd() : null
            environmentValues.push({
                enabled: enabled,
                segment: currentSegment,
                value: value === mockedConstants.featureNoValue?undefined:value,
                environmentKey: currentEnvironmentKey!,
                environment: currentEnvironment!
            })
        }
    })

    return environmentValues
}
