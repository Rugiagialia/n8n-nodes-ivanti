import { INodeProperties } from 'n8n-workflow';

export const eventDescription: INodeProperties[] = [
	{
		// Operations part

		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an event',
				action: 'Create an eroup',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an event',
				action: 'Get an event',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many events',
				action: 'Get many events',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an event',
				action: 'Update an event',
			},
			// {
			// 	name: 'Get',
			// 	value: 'get',
			// 	action: 'Get the top event',
			// 	description: 'Get the top event',
			// 	routing: {
			// 		request: {
			// 			method: 'GET',
			// 			url: '/HEAT/api/odata/businessobject/Frs_EVT_Events?$top=1',
			// 		},
			// 	},
			// },
		],
		default: 'get',
	},

	// Fields part

	{
		displayName: 'Event Number',
		name: 'number',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['event'],
			},
		},
	},
	{
		displayName: 'Event Description',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
	},
	{
		displayName: 'Event Notes',
		name: 'notes',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
			},
		},
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Custom Fields',
				name: 'customFieldsUi',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Custom Field',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'customFieldPairs',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field Name or ID',
								name: 'name',
								type: 'string',
								// type: 'options',
								// typeOptions: {
								// 	loadOptionsMethod: 'loadGroupCustomFields',
								// },
								default: '',
								description:
									'Name of the custom field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
							},
							{
								displayName: 'Field Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value to set on the custom field',
							},
						],
					},
				],
			},
		],
	},
];
