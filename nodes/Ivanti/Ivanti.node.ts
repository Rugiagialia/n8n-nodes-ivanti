import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { eventFields, eventOperations } from './EventDescription';

export class Ivanti implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ivanti',
		name: 'Ivanti',
		icon: 'file:ivanti.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Ivanti API',
		defaults: {
			name: 'Ivanti',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'IvantiApi',
				required: true,
			},
		],
		requestDefaults: {
			returnFullResponse: true,
			baseURL:  '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}/HEAT/api/odata/businessobject',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Event',
						value: 'event',
					},
					// {
					// 	name: 'Incident',
					// 	value: 'incident',
					// },
					// {
					// 	name: 'Change',
					// 	value: 'change',
					// },
					// {
					// 	name: 'Employee',
					// 	value: 'employee',
					// },
				],
				default: 'event',
			},

			...eventOperations,
			...eventFields,
		],
	};
}
