import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { eventFields, eventOperations } from './EventDescription';
import { taskFields, taskOperations } from './TaskDescription';
import { customFields, customOperations } from './CustomDescription';
import { changeFields, changeOperations } from './ChangeDescription';
import { employeeFields, employeeOperations } from './EmployeeDescription';
import { incidentFields, incidentOperations } from './IncidentDescription';

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
			skipSslCertificateValidation: true,
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
						name: 'Change',
						value: 'change',
					},
					{
						name: 'Custom Business Object',
						value: 'custom',
					},
					{
						name: 'Employee',
						value: 'employee',
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'Incident',
						value: 'incident',
					},
					// {
					// 	name: 'Organizational Unit',
					// 	value: 'orgunit',
					// },
					// {
					// 	name: 'Service Request',
					// 	value: 'servicereq',
					// },
					{
						name: 'Task',
						value: 'task',
					},
				],
				default: 'event',
			},

			...eventOperations,
			...eventFields,
			...taskOperations,
			...taskFields,
			...customOperations,
			...customFields,
			...changeOperations,
			...changeFields,
			...employeeOperations,
			...employeeFields,
			...incidentOperations,
			...incidentFields,
		],
	};
}
