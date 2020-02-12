<template>
  <div>
		<!-- begin page-header -->
		<h1 class="page-header">权限管理</h1>
		<!-- end page-header -->
		<!-- begin panel 
		:sort-options="{
				enabled: false,
			}"
		-->
		<panel title="用户一览">
			<vue-good-table
			mode="remote"
			@on-page-change="onPageChange"
			@on-sort-change="onSortChange"
			@on-column-filter="onColumnFilter"
			@on-per-page-change="onPerPageChange"
			styleClass="table table-bordered table-striped"
			:totalRows="totalRecords"
			:isLoading.sync="isLoading"
			:pagination-options="{
				enabled: true,
				perPageDropdown: [10, 20, 30],
				dropdownAllowAll: false,
				nextLabel: '下一页',
				prevLabel: '上一页',
				rowsPerPageLabel: '每页显示',
			}"
			:rows="rows"
			:columns="columns"
  >
				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'userFullName'">
						<span style="font-weight: bold; color: blue;">{{props.row.userFullName}}</span>
					</span>
					<span v-else>
     					 {{props.formattedRow[props.column.field]}}
    				</span>
					<span v-if="props.column.field == 'operation'">
						 <a href="#" @click.prevent="editUser(props.row)" class="fa fa-edit   m-r-15" title="编辑"></a>
						 <a href="#" @click.prevent ="deleteUser(props.row)" class="fa fa-trash" title="删除"></a>
					</span>
				</template>
				<div class="pull-right" slot="table-actions">
					<button @click="addUser" type="button" class="btn btn-primary fa fa-plus m-r-15">新增</button>
					<button @click="assignRole" type="button" class="btn btn-primary fa fa-users m-r-15">分配角色</button>
					<button @click="resetPassword" type="button" class="btn btn-primary fa fa-cog m-r-15">重置密码</button>
					<button @click="forbidden" type="button" class="btn btn-primary fa fa-lock m-r-15">禁用</button>
					<button @click="activate" type="button" class="btn btn-primary fa fa-unlock  m-r-15">启用</button> 
				</div>
			</vue-good-table>
		</panel>
		<!-- end panel -->
	</div>
</template>

<script>
export default {
	inject:['reload'],
    data(){
        return{
		    isLoading: false,
            columns: [{
				label: '用户名',
				field: 'loginName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索账号', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '姓名',
				field: 'userFullName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索姓名', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '角色',
				field: 'userRoles',
				formatFn: this.formatRoleName,
				width: '10%',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索角色', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '密级',
				field: 'securityLevel',
				formatFn: this.formatLevel,
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索密级', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '状态',
				field: 'statusName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索状态', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '联系方式',
				field: 'mobilePhone',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索电话', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '15%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			},{
				label: '邮箱',
				field: 'email',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索邮箱', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '15%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'

			},{
				label: '更新时间',
				field: 'updateTime',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '更新时间', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			},{
				label: '操作',
				width: '10%',
				field: 'operation',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}],
			rows: [],
			totalRecords: 0,
			serverParams: {
			// a map of column filters example: {name: 'john', age: '20'}
			columnFilters: {

			},
			sort: {
				field: 'updateTime', 
				type: 'desc',
			},
			page: 1, 
			perPage: 10
			}
        };
	},
	
    methods:{
		//对角色数组进行处理，去除角色名称
		formatRoleName: function(data) {
			let roleNames = '';
			let i = data.length;
			if(data[0].roleName != undefined){
			for(let item of data){
				roleNames += item.roleName;
				i--;
				if(i!=0){
				 roleNames+= "，"; 
				 }
			}
			}
			return roleNames;
		},
		//对密级格式化
		formatLevel:function(data){
			let level = '';
			switch (data) {
				case 0:
					level = "公开";
					break;
				case 1:
					level = "内部";
					break;
				case 2:
					level = "秘密";
					break;
				case 3:
					level = "机密";
					break;
				case 4:
					level = "绝密";
					break;
			}
			return level;
		},
		onRowClick(params) {
			// params.row - row object 
			// params.pageIndex - index of this row on the current page.
			// params.selected - if selection is enabled this argument 
			// indicates selected or not
			// params.event - click event
			console.log(params);
  		},
		//新增用户
		addUser:function(){
			// this.$swal({
			// 	title: 'Are you sure?',
			// 	text: 'You will not be able to recover this imaginary file!',
			// 	type: 'success',
			// 	showCancelButton: true,
			// 	buttonsStyling: false,
			// 	confirmButtonText: '  确认  ',
			// 	cancelButtonText: '取消',
			// 	confirmButtonClass: 'btn btn-primary m-r-10',
			// 	cancelButtonClass: 'btn btn-default',
			// });
			console.log("全局属性:"+this.$constant.ACCOUNT_EMPTY);
			this.$Alert.successAlert("新建成功","恭喜您新建用户成功！");
		},
		//编辑用户
		editUser:function(row){
			
		},
		deleteUser:function(row){
			this.$swal({
				title: '删除确认',
				text: '确认删除此用户吗?此操作不可恢复',
				type: 'warning',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
				// reverseButtons: true
			}).then((result) => {
				if(result.value){
					this.$postRequest('user/delete',{
						userId:row.userId	
						}).then(result=>{
							console.log("状态码："+result.data.code);
							if(result.data.code == 0){//删除成功
								this.reload();	
							}else{
								console.log("删除出错")
							}
						})
				}
			});

		},
		assignRole:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'warning',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		//重置密码
		resetPassword:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'info',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		//禁用
		forbidden:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'question',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		//启用
		activate:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'error',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		 	updateParams(newProps) {
			this.serverParams = Object.assign({}, this.serverParams, newProps);
			},
			
			onPageChange(params) {
			this.updateParams({page: params.currentPage});
			this.loadItems();
			},

			onPerPageChange(params) {
			this.updateParams({perPage: params.currentPerPage});
			this.loadItems();
			},

			onSortChange(params) {
			this.updateParams({
				sort: [{
				type: params.sortType,
				field: this.columns[params.columnIndex].field,
				}],
			});
			this.loadItems();
			},
			
			onColumnFilter(params) {
			this.updateParams(params);
			this.loadItems();
			},

			// load items is what brings back the rows from server
			loadItems() {
			// this.$postNormal('/user/users',{
			// serverParams:this.serverParams
			// }).then(response => {
			// 	this.totalRecords = response.data.total;
			// 	this.rows = response.data.records;
			// });
			}
    },
    created(){
		console.log(JSON.stringify(this.serverParams))
        // this.$postNormal('/user/users',{
		// serverParams:this.serverParams
		// }).then(result=>{
		// 	console.log(result.data);
		// 	this.totalRecords = result.data.total;
		// 	this.rows=result.data.records;
		// })
	}
	// watch: {
	// 	rows:{
	// 		handler(val, oldVal){
	// 			console.log('new: %s, old: %s', val, oldVal)
	// 		}
	// 	}
	// }
}
</script>

<style scoped>
.marginTop{
	margin-top: 9px
}
</style>