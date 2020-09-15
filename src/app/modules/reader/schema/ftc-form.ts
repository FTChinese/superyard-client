import { Validators } from '@angular/forms';
import { Tier, Cycle, cycleOpts } from 'src/app/data/schema/enum';
import { DropdownControl } from 'src/app/shared/widget/control';

/**
 * @description Hold data to create or update form.
 */
export interface FtcMemberForm {
  tier: Tier;
  cycle: Cycle;
  expireDate: string;
  payMethod: string;
}

export type FtcNewMemberReq = {
  ftcId?: string;
  unionId?: string;
} & FtcMemberForm;

export function buildCycleDropdown(tier?: Tier): DropdownControl {
  return new DropdownControl({
    value: null,
    key: 'cycle',
    validators: [Validators.required],
    label: 'Billing Cycle *',
    options: cycleOpts.map(opt => {
      return {
        disabled: (opt.value === 'month' && tier === 'premium') ? true : opt.disabled,
        name: opt.name,
        value: opt.value,
      };
    })
  });
}
