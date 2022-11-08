import { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a task',
				action: 'Create a task',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'POST',
						url: '/Task__Assignments',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a task',
				action: 'Delete a task',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'DELETE',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a task',
				action: 'Get a task',
				routing: {
					request: {
						method: 'GET',
						url: '/Task__Assignments',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Count',
				value: 'getCount',
				description: 'Retrieve a count of tasks',
				action: 'Retrieve a count of tasks',
				routing: {
					request: {
						method: 'GET',
						url: '/Task__Assignments',
					},
					send: {
						type: 'query',
						property: '$top',
						value: '1',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									count:
										'={{$responseItem["@odata.count"] == 0 ? 1 : $responseItem["@odata.count"] }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many tasks',
				action: 'Get many tasks',
				routing: {
					request: {
						method: 'GET',
						url: '/Task__Assignments',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a task',
				action: 'Update a task',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'PATCH',
					},
				},
			},
		],
		default: 'getAll',
	},
];

const createOperation: INodeProperties[] = [
	{
		displayName: 'Subject',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['task'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Subject',
			},
		},
		description: 'Short title of the task',
	},
	{
		displayName: 'Details',
		name: 'info',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['task'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Details',
			},
		},
		description: 'More information about the task',
	},
	{
		displayName: 'Parent Type',
		name: 'parentCategory',
		type: 'options',
		options: [
			{
				name: 'Change',
				value: 'Change',
			},
			{
				name: 'Event',
				value: 'Frs_EVT_Event',
			},
			{
				name: 'Incident',
				value: 'Incident',
			},
			{
				name: 'Service Request',
				value: 'ServiceReq',
			},
		],
		default: 'Incident',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['task'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'ParentLink_Category',
			},
		},
		description:
			'Which type of business object should be the task related to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Parent Record ID',
		name: 'parentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['task'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'ParentLink_RecID',
			},
		},
		description: 'RecId value of the task in Ivanti',
	},
	{
		displayName: 'Parent Link',
		name: 'parentLink',
		type: 'string',
		default: '={{null}}',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['task'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'ParentLink',
			},
		},
		description: 'ParenLink value of the task in Ivanti',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'Owner Team',
				name: 'ownerTeam',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OwnerTeam',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which team should investigate the task',
			},
			{
				displayName: 'Unread',
				name: 'isUnRead',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsUnRead',
					},
				},
				description: 'Whether task was read',
			},
			{
				displayName: 'Service (ID)',
				name: 'serviceId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service_Valid',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to the change',
			},
			{
				displayName: 'Service (Name)',
				name: 'service',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to task',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
		placeholder: 'Add Custom Field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'property',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						required: true,
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{$parent.name}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

const deleteOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['task'],
			},
		},
		routing: {
			request: {
				url: "=/Task__Assignments('{{ $value }}')",
			},
			output: {
				postReceive: [
					{
						type: 'setKeyValue',
						properties: {
							Result: 'Success',
						},
					},
				],
			},
		},
		description: 'RecId value of the task in Ivanti',
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'idType',
		type: 'options',
		options: [
			{
				name: 'Number',
				value: 'taskNumber',
			},
			{
				name: 'Record ID',
				value: 'recId',
			},
		],
		default: 'recId',
		required: true,
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['task'],
			},
		},
		description: 'Choose ID type from the list',
	},
	{
		displayName: 'Number',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['task'],
				idType: ['taskNumber'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: '=AssignmentID eq {{ $value }}',
			},
		},
		description: 'AssignmentID value of the task in Ivanti',
	},
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['task'],
				idType: ['recId'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: "=RecId eq '{{ $value }}'",
			},
		},
		description: 'RecId value of the task in Ivanti',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'AssignmentID, RecId, Status, Owner',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$top',
				value: '={{ $value }}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Send Sort Parameters',
		name: 'sortOptions',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether the request has sorting parameters or not',
	},
	{
		displayName: 'Sort',
		name: 'sortUi',
		type: 'fixedCollection',
		placeholder: 'Add Sort Options',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
				sortOptions: [true],
			},
		},
		typeOptions: {
			multipleValues: false,
		},
		default: {
			// -----------------------------
			// There is a bug (or a feature). You can't add defaults if multipleValues is set to false
			// -----------------------------
			// sortDetails: [
			// 	{
			// 		sortBy: 'CreatedDateTime',
			// 		orderBy: 'asc',
			// 	},
			// ],
		},
		options: [
			{
				displayName: 'Sort Options',
				name: 'sortDetails',
				values: [
					{
						displayName: 'Sort Key Name or ID',
						name: 'sortBy',
						type: 'options',
						options: [
							{
								name: 'Creation Time',
								value: 'CreatedDateTime',
							},
							{
								name: 'Last Modification Time',
								value: 'LastModDateTime',
							},
						],
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						default: 'CreatedDateTime',
					},
					{
						displayName: 'Sort Order',
						name: 'orderBy',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'desc',
						routing: {
							send: {
								type: 'query',
								property: '$orderby',
								value: '={{ $parent.sortBy }} {{ $value }}',
							},
						},
					},
				],
			},
		],
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Open'",
			},
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'AssignmentID, RecId, Status, Owner',
			},
			{
				displayName: 'Skip Records',
				name: 'skip',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
					maxValue: 100,
				},
				routing: {
					send: {
						type: 'query',
						property: '$skip',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Use this property when looping trough more than 100 results',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getCountOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getCount'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Open'",
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const updateOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['task'],
			},
		},
		routing: {
			request: {
				url: "=/Task__Assignments('{{ $value }}')",
			},
		},
		description: 'RecId value of the task in Ivanti',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'Details',
				name: 'info',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Details',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'More information about the task',
			},
			{
				displayName: 'Owner Team',
				name: 'ownerTeam',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OwnerTeam',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which team should investigate the task',
			},
			{
				displayName: 'Parent Link',
				name: 'parentLink',
				type: 'string',
				default: '={{null}}',
				routing: {
					send: {
						type: 'body',
						property: 'ParentLink',
					},
				},
				description: 'ParenLink value of the task in Ivanti',
			},
			{
				displayName: 'Parent Record ID',
				name: 'parentId',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'ParentLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'RecId value of the task in Ivanti',
			},
			{
				displayName: 'Parent Type',
				name: 'parentCategory',
				type: 'options',
				options: [
					{
						name: 'Change',
						value: 'Change',
					},
					{
						name: 'Event',
						value: 'Frs_EVT_Event',
					},
					{
						name: 'Incident',
						value: 'Incident',
					},
					{
						name: 'Service Request',
						value: 'ServiceReq',
					},
				],
				default: 'Incident',
				routing: {
					send: {
						type: 'body',
						property: 'ParentLink_Category',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'Which type of business object should be the task related to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Resolution',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Resolution details of the task',
			},
			{
				displayName: 'Service (ID)',
				name: 'serviceId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service_Valid',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to the change',
			},
			{
				displayName: 'Service (Name)',
				name: 'service',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to task',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Status',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Status of the task',
			},
			{
				displayName: 'Subject',
				name: 'title',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Subject',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Short title of the task',
			},
			{
				displayName: 'Unread',
				name: 'isUnRead',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsUnRead',
					},
				},
				description: 'Whether task was read',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
		placeholder: 'Add Custom Field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'property',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{ $parent.name !== " " ? $parent.name : undefined}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

export const taskFields: INodeProperties[] = [
	...createOperation,
	...deleteOperation,
	...getAllOperation,
	...getOperation,
	...getCountOperation,
	...updateOperation,
];
