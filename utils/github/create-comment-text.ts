import {IFeaturesResults} from "../flagsmith/api/fetch-feature";
import moment from 'moment'
import parseLanguage from "../parseLanguage";

const title = '### This pull request is linked to a Flagsmith Feature'
const openingMarkdown = (language:string)=>`\`\`\`${language}`
const closingMarkdown = `\`\`\``

// Based on a set of feature states across multiple environments, returns markdown text for a comment
export default function (data:IFeaturesResults[]) {
    const lastUpdatedString = `Last Updated ${moment().format("Do MMM YYYY HH:mma")}`
    return `${title}:
${data.map((featureResults)=>{
        return `${featureResults.features.map((v)=>{
            let featureValue = v.feature_state_value.integer_value || v.feature_state_value.string_value || v.feature_state_value.boolean_value
            const hasFeatureValue = featureValue!=null && typeof featureValue!='undefined'
            let language = hasFeatureValue ? parseLanguage(featureValue) : ''
            const featureValueString = hasFeatureValue? `
${openingMarkdown(language||'')}
${featureValue}
${closingMarkdown}
`:''
            return `**${featureResults.environment.name}${v.segment?.name?` - ${v.segment.name}`:""}**
- [${v.enabled?'x':' '}] ${v.enabled?'Enabled': 'Disabled'}${featureValueString}`
}).join("\n")}
`}).join("\n")}

${lastUpdatedString}
`
}
