import { IFeaturesResults} from "../flagsmith/fetch-feature";
import moment from 'moment'
export default function (data:IFeaturesResults[]) {
    return `Flagsmith Feature:
${data.map((v)=>{
        return `**${v.environment.name}**
${v.features.map((v)=>{
            const featureValue = v.feature_state_value.integer_value || v.feature_state_value.string_value || v.feature_state_value.boolean_value
            const hasFeature = featureValue!=null && typeof featureValue!='undefined'
            return `- [${v.enabled?'x':' '}] ${v.segment?v.segment.name:'Environment Default'}${hasFeature?
`
Value: 
\`\`\`
${featureValue}
\`\`\`
`:''}`
}).join("\n")}
`}).join("\n")}

Last Updated ${moment().format("Do MMM YYYY HH:mma")}
`
}
