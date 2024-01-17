import { Permission } from "./../../modules/admins/entities/Permission.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class PermissionDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {

    const repository = dataSource.getRepository(Permission);

    const data = [
      {
        name: "Dashboard",
        slug: "dashboard",
        group: "dashboard",
      },
      {
        name: "Purchase Module",
        slug: "purchase_module",
        group: "purchase",
      },

      {
        name: "Purchase Dashboard",
        slug: "purchase.dashboard",
        group: "purchase",
      },
      {
        name: "Purchase View",
        slug: "purchase.view",
        group: "purchase",
      },
      {
        name: "Purchase Create",
        slug: "purchase.create",
        group: "purchase",
      },
      {
        name: "Purchase Update",
        slug: "purchase.update",
        group: "purchase",
      },
      {
        name: "Purchase Delete",
        slug: "purchase.delete",
        group: "purchase",
      },

      {
        name: "Purchase Active",
        slug: "purchase.active",
        group: "purchase",
      },

      {
        name: "Purchase Approve",
        slug: "purchase.approve",
        group: "purchase",
      },
      {
        name: "Purchase Reject",
        slug: "purchase.reject",
        group: "purchase",
      },
      {
        name: "Purchase Items",
        slug: "purchase.items",
        group: "purchase",
      },
      {
        name: "Purchase Actions",
        slug: "purchase.actions",
        group: "purchase",
      },

      {
        name: "Purchase Setup",
        slug: "purchase.setup",
        group: "purchase",
      },

      {
        name: "Purchase Report",
        slug: "purchase.report",
        group: "purchase",
      },

      {
        name: "item View",
        slug: "item.view",
        group: "purchase",
      },
      {
        name: "item Create",
        slug: "item.create",
        group: "purchase",
      },
      {
        name: "item update",
        slug: "item.update",
        group: "purchase",
      },
      {
        name: "item Delete",
        slug: "item.delete",
        group: "purchase",
      },
      {
        name: "item Active",
        slug: "item.active",
        group: "purchase",
      },
      {
        name: "size View",
        slug: "size.view",
        group: "purchase",
      },
      {
        name: "size Create",
        slug: "size.create",
        group: "purchase",
      },
      {
        name: "size update",
        slug: "size.update",
        group: "purchase",
      },
      {
        name: "size Delete",
        slug: "size.delete",
        group: "purchase",
      },
      {
        name: "size Active",
        slug: "size.active",
        group: "purchase",
      },
      {
        name: "Occasion View",
        slug: "occasion.view",
        group: "purchase",
      },
      {
        name: "occasion Create",
        slug: "occasion.create",
        group: "purchase",
      },
      {
        name: "occasion update",
        slug: "occasion.update",
        group: "purchase",
      },
      {
        name: "occasion Delete",
        slug: "occasion.delete",
        group: "purchase",
      },
      {
        name: "occasion Active",
        slug: "occasion.active",
        group: "purchase",
      },

      {
        name: "category View",
        slug: "category.view",
        group: "purchase",
      },
      {
        name: "category Create",
        slug: "category.create",
        group: "purchase",
      },
      {
        name: "category update",
        slug: "category.update",
        group: "purchase",
      },
      {
        name: "category Delete",
        slug: "category.delete",
        group: "purchase",
      },
      {
        name: "category active",
        slug: "category.active",
        group: "purchase",
      },

      {
        name: "subcategory View",
        slug: "subcategory.view",
        group: "purchase",
      },
      {
        name: "subcategory Create",
        slug: "subcategory.create",
        group: "purchase",
      },
      {
        name: "subcategory update",
        slug: "subcategory.update",
        group: "purchase",
      },
      {
        name: "subcategory Delete",
        slug: "subcategory.delete",
        group: "purchase",
      },
      {
        name: "subcategory active",
        slug: "subcategory.active",
        group: "purchase",
      },

      {
        name: "product origin View",
        slug: "product_origin.view",
        group: "purchase",
      },
      {
        name: "product origin Create",
        slug: "product_origin.create",
        group: "purchase",
      },
      {
        name: "product origin update",
        slug: "product_origin.update",
        group: "purchase",
      },
      {
        name: "product origin Delete",
        slug: "product_origin.delete",
        group: "purchase",
      },
      {
        name: "product origin active",
        slug: "product_origin.active",
        group: "purchase",
      },

      {
        name: "material View",
        slug: "material.view",
        group: "purchase",
      },
      {
        name: "material Create",
        slug: "material.create",
        group: "purchase",
      },
      {
        name: "material update",
        slug: "material.update",
        group: "purchase",
      },
      {
        name: "material Delete",
        slug: "material.delete",
        group: "purchase",
      },
      {
        name: "material active",
        slug: "material.active",
        group: "purchase",
      },

      {
        name: "color View",
        slug: "color.view",
        group: "purchase",
      },
      {
        name: "color Create",
        slug: "color.create",
        group: "purchase",
      },
      {
        name: "color update",
        slug: "color.update",
        group: "purchase",
      },
      {
        name: "color Delete",
        slug: "color.delete",
        group: "purchase",
      },
      {
        name: "color active",
        slug: "color.active",
        group: "purchase",
      },

      {
        name: "brand View",
        slug: "brand.view",
        group: "purchase",
      },
      {
        name: "brand Create",
        slug: "brand.create",
        group: "purchase",
      },
      {
        name: "brand update",
        slug: "brand.update",
        group: "purchase",
      },
      {
        name: "brand Delete",
        slug: "brand.delete",
        group: "purchase",
      },
      {
        name: "brand active",
        slug: "brand.active",
        group: "purchase",
      },
      {
        name: "currency View",
        slug: "currency.view",
        group: "purchase",
      },
      {
        name: "currency Create",
        slug: "currency.create",
        group: "purchase",
      },
      {
        name: "currency update",
        slug: "currency.update",
        group: "purchase",
      },
      {
        name: "currency Delete",
        slug: "currency.delete",
        group: "purchase",
      },
      {
        name: "currency active",
        slug: "currency.active",
        group: "purchase",
      },
      // margin
      {
        name: "margin View",
        slug: "margin.view",
        group: "purchase",
      },
      {
        name: "margin Create",
        slug: "margin.create",
        group: "purchase",
      },
      {
        name: "margin update",
        slug: "margin.update",
        group: "purchase",
      },
      {
        name: "margin Delete",
        slug: "margin.delete",
        group: "purchase",
      },
      {
        name: "margin active",
        slug: "margin.active",
        group: "purchase",
      },

      {
        name: "unit View",
        slug: "unit.view",
        group: "purchase",
      },
      {
        name: "unit Create",
        slug: "unit.create",
        group: "purchase",
      },
      {
        name: "unit update",
        slug: "unit.update",
        group: "purchase",
      },
      {
        name: "unit Delete",
        slug: "unit.delete",
        group: "purchase",
      },
      {
        name: "unit active",
        slug: "unit.active",
        group: "purchase",
      },

      {
        name: "Purchase Return",
        slug: "purchase.return",
        group: "purchase",
      },
      // inventory
      // inventory_module

      {
        name: "inventory Module",
        slug: "inventory_module",
        group: "inventory",
      },

      {
        name: "inventory Dashboard",
        slug: "inventory.dashboard",
        group: "inventory",
      },

      {
        name: "Product View",
        slug: "product.view",
        group: "inventory",
      },
      {
        name: "Product update",
        slug: "product.update",
        group: "inventory",
      },

      {
        name: "item Ledger",
        slug: "item.ledger",
        group: "inventory",
      },
      {
        name: "Product Price Setup",
        slug: "product.price.setup",
        group: "inventory",
      },
      {
        name: "Purchase & Sale",
        slug: "purchase.sale",
        group: "inventory",
      },
      {
        name: "Stock Adjustment",
        slug: "stock.adjustment",
        group: "inventory",
      },
      {
        name: "Stock CrossCheck",
        slug: "stock.crosscheck",
        group: "inventory",
      },
      {
        name: "Stock Flow Records",
        slug: "stock.flow.records",
        group: "inventory",
      },
      {
        name: "Stock Transfer",
        slug: "stock.transfer",
        group: "inventory",
      },
      {
        name: "damage Product",
        slug: "damage.product",
        group: "inventory",
      },

      {
        name: "inventory Report",
        slug: "inventory.report",
        group: "inventory",
      },

      // hr
      // hr_module
      {
        name: "HR Module",
        slug: "hr_module",
        group: "hr",
      },

      {
        name: "HR Dashboard",
        slug: "hr.dashboard",
        group: "hr",
      },
      // employee
      {
        name: "Employee View",
        slug: "employee.view",
        group: "hr",
      },
      {
        name: "Employee Create",
        slug: "employee.create",
        group: "hr",
      },
      {
        name: "Employee update",
        slug: "employee.update",
        group: "hr",
      },
      {
        name: "Employee delete",
        slug: "employee.delete",
        group: "hr",
      },
      {
        name: "Employee Active",
        slug: "employee.active",
        group: "hr",
      },
      // leave
      {
        name: "leave View",
        slug: "leave.view",
        group: "hr",
      },
      {
        name: "leave Create",
        slug: "leave.create",
        group: "hr",
      },
      {
        name: "leave update",
        slug: "leave.update",
        group: "hr",
      },

      {
        name: "leave delete",
        slug: "leave.delete",
        group: "hr",
      },

      // leave policy
      {
        name: "leave policy View",
        slug: "leave_policy.view",
        group: "hr",
      },
      {
        name: "leave policy Create",
        slug: "leave_policy.create",
        group: "hr",
      },
      {
        name: "leave policy update",
        slug: "leave_policy.update",
        group: "hr",
      },
      {
        name: "leave policy delete",
        slug: "leave_policy.delete",
        group: "hr",
      },
      // leave type
      {
        name: "leave type View",
        slug: "leave_type.view",
        group: "hr",
      },
      {
        name: "leave type Create",
        slug: "leave_type.create",
        group: "hr",
      },
      {
        name: "leave type update",
        slug: "leave_type.update",
        group: "hr",
      },

      {
        name: "leave type delete",
        slug: "leave_type.delete",
        group: "hr",
      },
      {
        name: "leave type active",
        slug: "leave_type.active",
        group: "hr",
      },
      // leave reason
      {
        name: "leave reason View",
        slug: "leave_reason.view",
        group: "hr",
      },
      {
        name: "leave reason Create",
        slug: "leave_reason.create",
        group: "hr",
      },
      {
        name: "leave reason update",
        slug: "leave_reason.update",
        group: "hr",
      },
      {
        name: "leave reason delete",
        slug: "leave_reason.delete",
        group: "hr",
      },
      // leave balance
      {
        name: "leave balance View",
        slug: "leave_balance.view",
        group: "hr",
      },
      {
        name: "leave balance Create",
        slug: "leave_balance.create",
        group: "hr",
      },
      {
        name: "leave balance update",
        slug: "leave_balance.update",
        group: "hr",
      },
      {
        name: "leave balance delete",
        slug: "leave_balance.delete",
        group: "hr",
      },
      // payroll
      {
        name: "payroll View",
        slug: "payroll.view",
        group: "hr",
      },

      // salary breakdown
      {
        name: "salary breakdown View",
        slug: "salary_breakdown.view",
        group: "hr",
      },
      {
        name: "salary breakdown Create",
        slug: "salary_breakdown.create",
        group: "hr",
      },
      {
        name: "salary breakdown update",
        slug: "salary_breakdown.update",
        group: "hr",
      },
      {
        name: "salary breakdown delete",
        slug: "salary_breakdown.delete",
        group: "hr",
      },

      {
        name: "salary breakdown Active",
        slug: "salary_breakdown.active",
        group: "hr",
      },

      // bonus
      {
        name: "bonus View",
        slug: "bonus.view",
        group: "hr",
      },
      {
        name: "bonus Create",
        slug: "bonus.create",
        group: "hr",
      },
      {
        name: "bonus update",
        slug: "bonus.update",
        group: "hr",
      },
      {
        name: "bonus delete",
        slug: "bonus.delete",
        group: "hr",
      },
      // Adjustment Type
      {
        name: "Adjustment Type View",
        slug: "adjustment_type.view",
        group: "hr",
      },
      {
        name: "Adjustment Type Create",
        slug: "adjustment_type.create",
        group: "hr",
      },
      {
        name: "Adjustment Type update",
        slug: "adjustment_type.update",
        group: "hr",
      },
      {
        name: "Adjustment Type delete",
        slug: "adjustment_type.delete",
        group: "hr",
      },
      // Adjustment
      {
        name: "Adjustment View",
        slug: "adjustment.view",
        group: "hr",
      },
      {
        name: "Adjustment Create",
        slug: "adjustment.create",
        group: "hr",
      },
      {
        name: "Adjustment update",
        slug: "adjustment.update",
        group: "hr",
      },
      {
        name: "Adjustment delete",
        slug: "adjustment.delete",
        group: "hr",
      },
      // fixed allowance
      {
        name: "fixed allowance View",
        slug: "fixed_allowance.view",
        group: "hr",
      },
      {
        name: "fixed allowance Create",
        slug: "fixed_allowance.create",
        group: "hr",
      },
      {
        name: "fixed allowance update",
        slug: "fixed_allowance.update",
        group: "hr",
      },
      {
        name: "fixed allowance delete",
        slug: "fixed_allowance.delete",
        group: "hr",
      },
      // salary
      {
        name: "salary View",
        slug: "salary.view",
        group: "hr",
      },
      {
        name: "salary Create",
        slug: "salary.create",
        group: "hr",
      },
      {
        name: "salary update",
        slug: "salary.update",
        group: "hr",
      },
      {
        name: "salary delete",
        slug: "salary.delete",
        group: "hr",
      },

      // attendance
      {
        name: "attendance View",
        slug: "attendance.view",
        group: "hr",
      },
      {
        name: "attendance Create",
        slug: "attendance.create",
        group: "hr",
      },
      {
        name: "attendance update",
        slug: "attendance.update",
        group: "hr",
      },
      {
        name: "attendance delete",
        slug: "attendance.delete",
        group: "hr",
      },
      {
        name: "attendance active",
        slug: "attendance.active",
        group: "hr",
      },
      {
        name: "attendance report",
        slug: "attendance.report",
        group: "hr",
      },

      // Employment Types
      {
        name: "Employment Types View",
        slug: "employment_type.view",
        group: "hr",
      },
      {
        name: "Employment Types Create",
        slug: "employment_type.create",
        group: "hr",
      },
      {
        name: "Employment Types update",
        slug: "employment_type.update",
        group: "hr",
      },

      {
        name: "Employment Types delete",
        slug: "employment_type.delete",
        group: "hr",
      },
      {
        name: "Employment Types active",
        slug: "employment_type.active",
        group: "hr",
      },

      // employee_position
      {
        name: "Employee Position View",
        slug: "employee_position.view",
        group: "hr",
      },
      {
        name: "Employee Position Create",
        slug: "employee_position.create",
        group: "hr",
      },
      {
        name: "Employee Position update",
        slug: "employee_position.update",
        group: "hr",
      },
      {
        name: "Employee Position delete",
        slug: "employee_position.delete",
        group: "hr",
      },
      {
        name: "Employee Position Active",
        slug: "employee_position.active",
        group: "hr",
      },
      // Employee department
      {
        name: "Employee department View",
        slug: "employee_department.view",
        group: "hr",
      },
      {
        name: "Employee department Create",
        slug: "employee_department.create",
        group: "hr",
      },
      {
        name: "Employee department update",
        slug: "employee_department.update",
        group: "hr",
      },
      {
        name: "Employee department delete",
        slug: "employee_department.delete",
        group: "hr",
      },
      {
        name: "Employee department Active",
        slug: "employee_department.active",
        group: "hr",
      },

      // office shift
      {
        name: "office shift View",
        slug: "office_shift.view",
        group: "hr",
      },
      {
        name: "office shift Create",
        slug: "office_shift.create",
        group: "hr",
      },
      {
        name: "office shift update",
        slug: "office_shift.update",
        group: "hr",
      },

      // report
      {
        name: "Hr report View",
        slug: "hr_report.view",
        group: "hr",
      },

      // pos & sale
      {
        name: "Pos & Sale Module",
        slug: "pos_module",
        group: "pos",
      },

      {
        name: "Pos & Sale Dashboard",
        slug: "pos.dashboard",
        group: "pos",
      },

      // accounting

      {
        name: "Accounting Module",
        slug: "accounting_module",
        group: "accounting",
      },

      {
        name: "Accounting Dashboard",
        slug: "accounting.dashboard",
        group: "accounting",
      },

      // csrm
      // csrm_module

      {
        name: "CSRM Module",
        slug: "csrm_module",
        group: "csrm",
      },

      {
        name: "CSRM Dashboard",
        slug: "csrm.dashboard",
        group: "csrm",
      },

      // supplier

      {
        name: "supplier View",
        slug: "supplier.view",
        group: "csrm",
      },
      {
        name: "supplier Create",
        slug: "supplier.create",
        group: "csrm",
      },
      {
        name: "supplier Update",
        slug: "supplier.update",
        group: "csrm",
      },
      {
        name: "supplier Delete",
        slug: "supplier.delete",
        group: "csrm",
      },
      {
        name: "supplier Active",
        slug: "supplier.active",
        group: "csrm",
      },

      // cf
      {
        name: "cf View",
        slug: "cf.view",
        group: "csrm",
      },
      {
        name: "cf Create",
        slug: "cf.create",
        group: "csrm",
      },
      {
        name: "cf Update",
        slug: "cf.update",
        group: "csrm",
      },
      {
        name: "cf Delete",
        slug: "cf.delete",
        group: "csrm",
      },
      {
        name: "cf Active",
        slug: "cf.active",
        group: "csrm",
      },

      // customer
      {
        name: "customer View",
        slug: "customer.view",
        group: "csrm",
      },
      {
        name: "customer Create",
        slug: "customer.create",
        group: "csrm",
      },
      {
        name: "customer Update",
        slug: "customer.update",
        group: "csrm",
      },
      {
        name: "customer Delete",
        slug: "customer.delete",
        group: "csrm",
      },
      {
        name: "customer Active",
        slug: "customer.active",
        group: "csrm",
      },

      // courier
      // courier_module
      {
        name: "Courier Module",
        slug: "courier_module",
        group: "courier",
      },

      {
        name: "courier Dashboard",
        slug: "courier.dashboard",
        group: "courier",
      },

      // lc
      // lc_module
      {
        name: "LC Module",
        slug: "lc_module",
        group: "lc",
      },

      {
        name: "LC Dashboard",
        slug: "lc.dashboard",
        group: "lc",
      },

      {
        name: "Lc View",
        slug: "lc.view",
        group: "lc",
      },
      {
        name: "Lc Create",
        slug: "lc.create",
        group: "lc",
      },
      {
        name: "Lc Update",
        slug: "lc.update",
        group: "lc",
      },
      {
        name: "Lc Delete",
        slug: "lc.delete",
        group: "lc",
      },
      {
        name: "Lc Active",
        slug: "lc.active",
        group: "lc",
      },

      // setting
      // setting_module
      {
        name: "Setting Module",
        slug: "setting_module",
        group: "setting",
      },

      {
        name: "Setting Dashboard",
        slug: "setting.dashboard",
        group: "setting",
      },

      // roles and permission admins
      {
        name: "Admin Module",
        slug: "admin_module",
        group: "setting",
      },

      {
        name: "Admin View",
        slug: "admin.view",
        group: "setting",
      },
      {
        name: "Admin Create",
        slug: "admin.create",
        group: "setting",
      },
      {
        name: "Admin Update",
        slug: "admin.update",
        group: "setting",
      },
      {
        name: "Admin Delete",
        slug: "admin.delete",
        group: "setting",
      },
      {
        name: "Admin Active",
        slug: "admin.active",
        group: "setting",
      },

      {
        name: "Role View",
        slug: "role.view",
        group: "setting",
      },
      {
        name: "Role Create",
        slug: "role.create",
        group: "setting",
      },
      {
        name: "Role Update",
        slug: "role.update",
        group: "setting",
      },
      {
        name: "Role Delete",
        slug: "role.delete",
        group: "setting",
      },
      {
        name: "Role Active",
        slug: "role.active",
        group: "setting",
      },

      {
        name: "Permission View",
        slug: "permission.view",
        group: "setting",
      },
      {
        name: "Permission Create",
        slug: "permission.create",
        group: "setting",
      },
      // end roles and permission admins

      // branch

      {
        name: "Branch View",
        slug: "branch.view",
        group: "setting",
      },
      {
        name: "Branch Create",
        slug: "branch.create",
        group: "setting",
      },
      {
        name: "Branch Update",
        slug: "branch.update",
        group: "setting",
      },
      {
        name: "Branch Delete",
        slug: "branch.delete",
        group: "setting",
      },
      {
        name: "Branch Active",
        slug: "branch.active",
        group: "setting",
      },

      // end branch
      // branch

      {
        name: "Owner View",
        slug: "owner.view",
        group: "setting",
      },
      {
        name: "Owner Create",
        slug: "owner.create",
        group: "setting",
      },
      {
        name: "Owner Update",
        slug: "owner.update",
        group: "setting",
      },
      {
        name: "Owner Delete",
        slug: "owner.delete",
        group: "setting",
      },
      {
        name: "Owner Active",
        slug: "owner.active",
        group: "setting",
      },

      // end branch

      // company

      {
        name: "Company View",
        slug: "company.view",
        group: "setting",
      },
      {
        name: "Company Create",
        slug: "company.create",
        group: "setting",
      },
      {
        name: "Company Update",
        slug: "company.update",
        group: "setting",
      },
      {
        name: "Company Delete",
        slug: "company.delete",
        group: "setting",
      },

      {
        name: "Company Active",
        slug: "company.active",
        group: "setting",
      },

      // end company

      {
        name: "Data Backup",
        slug: "data.backup",
        group: "setting",
      },

      {
        name: "Data Restore",
        slug: "data.restore",
        group: "setting",
      },
    ];

    data.map(async (item) => {
      const permission = await repository.findOne({
        where: { slug: item.slug },
      });
      if (!permission) {
        await repository.save({
          name: item.name,
          slug: item.slug,
          group: item.group,
        });
      }
    });
  }
}
