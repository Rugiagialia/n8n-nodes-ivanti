import { Credentials, IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { OptionsWithUri } from 'request';

import { eventDescription } from './descriptions';

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

			...eventDescription,
			// ...executionFields,
		],
	};

	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// For each item, make an API call to create a contact
		for (let i = 0; i < items.length; i++) {
			if (resource === 'event') {
				if (operation === 'get') {
					// Make HTTP request according to
					const eventNumber = this.getNodeParameter('number', 0) as string;
					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						uri: `https://msp-stg.bluebridge.lt/HEAT/api/odata/businessobject/Frs_EVT_Events?$filter=EventNumber eq ` + eventNumber,
						json: true,
					};
					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'IvantiApi',
						options,
					);
					returnData.push(responseData.value[0]);
				}
				else if (operation === 'getAll') {
					// Make HTTP request according to
					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						uri: `https://msp-stg.bluebridge.lt/HEAT/api/odata/businessobject/Frs_EVT_Events?$top=10`,
						json: true,
					};
					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'IvantiApi',
						options,
					);
					for (const item of responseData.value) returnData.push(item);
				}
			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}
