import { INodeType, INodeTypeDescription } from 'n8n-workflow';
export class Ivanti implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ivanti',
		name: 'Ivanti',
		icon: 'file:ivanti.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from Ivanti API',
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
			baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}',
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
					{
						name: 'Incident',
						value: 'incident',
					},
					{
						name: 'Change',
						value: 'change',
					},
					{
						name: 'Employee',
						value: 'employee',
					},
				],
				default: 'event',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'event',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the top event',
						description: 'Get the top event',
						routing: {
							request: {
								method: 'GET',
								url: '/HEAT/api/odata/businessobject/Frs_EVT_Events?$top=1',
							},
						},
					},
				],
				default: 'get',
			},

			// ...executionOperations,
			// ...executionFields,

		],
	};
}
