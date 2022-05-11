import { IFeaturesResults} from "../flagsmith/fetch-feature";
import moment from 'moment'
export default function (data:IFeaturesResults[]) {
    return `Flagsmith Feature:
${data.map((v)=>{
        return `**${v.environment.name}**
${v.features.map((v)=>{
return `- [${v.enabled?'x':' '}] ${v.segment?v.segment.name:'Environment Default'}${v.feature_state_value?
`
Value: \`\`\`
${v.feature_state_value}
\`\`\``:''}`
}).join("\n")}
`}).join("\n")}

Last Updated ${moment().format("Do MMM YYYY HH:mma")}
`
}
