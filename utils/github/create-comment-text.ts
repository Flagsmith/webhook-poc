import {IFeaturesResults} from "../flagsmith/fetch-feature";
import moment from 'moment'
import parseLanguage from "../parseLanguage";

export default function (data:IFeaturesResults[]) {
    return `Flagsmith Feature:
${data.map((featureResults)=>{
        return `${featureResults.features.map((v)=>{
            let featureValue = v.feature_state_value.integer_value || v.feature_state_value.string_value || v.feature_state_value.boolean_value
            const hasFeatureValue = featureValue!=null && typeof featureValue!='undefined'
            let language = hasFeatureValue ? parseLanguage(featureValue) : ''
            const featureValueString = hasFeatureValue? `
\`\`\`${language}
${featureValue}
\`\`\`
`:''
            return `**${featureResults.environment.name}${v.segment?.name?` - ${v.segment.name}`:""}**
            - [${v.enabled?'x':' '}] Enabled${featureValueString}`
}).join("\n")}
`}).join("\n")}

Last Updated ${moment().format("Do MMM YYYY HH:mma")}
`
}
