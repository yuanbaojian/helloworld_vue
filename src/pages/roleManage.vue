<template>
  <div>
		<!-- begin breadcrumb -->
		<ol class="breadcrumb pull-right">
			<li class="breadcrumb-item"><a href="javascript:;">主页</a></li>
			<li class="breadcrumb-item"><a href="javascript:;">系统管理</a></li>
			<li class="breadcrumb-item active">角色管理</li>
		</ol>
		<!-- end breadcrumb -->
		<!-- begin page-header -->
		<h1 class="page-header">角色管理</h1>
		<!-- end page-header -->
		<!-- begin panel -->
		<panel title="角色一览">
			<vue-good-table
			 :columns="columns"
 			 :rows="rows"
			 :line-numbers="true"
			 styleClass="table table-hover table-bordered nowrap"
			 :pagination-options="{
			 	enabled: true,
				mode: 'records',
				perPage: 10,
				perPageDropdown: [10, 20, 30],
				dropdownAllowAll: false,
				nextLabel: '下一页',
				prevLabel: '上一页',
				rowsPerPageLabel: '每页显示',
  			}"
  >
				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'operation'">
						 <a href="#" class="fa fa-edit   m-r-5" title="编辑"></a>
						 <a href="#" class="fa fa-trash  m-r-5" title="删除"></a>
                         <a href="#" class="fa fa-cog" title="权限设置"></a>
					</span>
				</template>
			</vue-good-table>
		</panel>
		<!-- end panel -->
	</div>
</template>

<script>
export default {
    data(){
        return{
           columns: [{
				label: '角色名称',
				field: 'roleName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索名称', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '权限',
				field: 'rolePermission',
				formatFn: this.formatPermission,
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索权限', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '30%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '备注',
				field: 'remark',
				width: '10%',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索备注', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '更新时间',
				field: 'updateTime',
				filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索时间', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '15%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '操作',
				field: 'operation',
				width: '15%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}],
			rows:'',
        }
    },
    methods:{
		//对权限数组处理
		formatPermission:function(data){
			let permissionNames = '';
			let i = data.length;
			for(let item of data){
				permissionNames += item.permissionName;
				i--;
				if(i!=0){
				 permissionNames+= "，"; 
				 }
			}
			return permissionNames;
		},
        	//新增用户
		addUser:function(){
			console.log("添加用户的方法")
		},
		//分配角色
		assigntUser:function(){
			console.log("分配角色的方法")
		},
		//重置密码
		resetPassword:function(){

		},
		//禁用
		forbidden:function(){

		},
		//启用
		activate:function(){

		}
    },
    created(){
        this.$postRequest('/role/roles',{
		}).then(result=>{
			this.rows=result.data;
        })
    }
}
</script>

<style scoped>
/* .text-cneter{
    text-align: center
} */

</style>