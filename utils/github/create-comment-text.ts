import { IFeaturesResults} from "../flagsmith/fetch-feature";
import moment from 'moment'
export default function (data:IFeaturesResults[]) {
    return `Flagsmith Feature:
${data.map((v)=>{
        return `**${v.environment.name}**
${v.features.map((v)=>{
            let featureValue = v.feature_state_value.integer_value || v.feature_state_value.string_value || v.feature_state_value.boolean_value
            let isJSON = false;
            try {
                featureValue = JSON.stringify(featureValue, null, 2)
                isJSON = true
            } catch (e) {
                
            }
            const hasFeature = featureValue!=null && typeof featureValue!='undefined'
            return `- [${v.enabled?'x':' '}] ${v.segment?v.segment.name:'Environment Default'}${hasFeature?
`
\`\`\`${isJSON?'json':""}
${featureValue}
\`\`\`
`:''}`
}).join("\n")}
`}).join("\n")}

Last Updated ${moment().format("Do MMM YYYY HH:mma")}
`
}
