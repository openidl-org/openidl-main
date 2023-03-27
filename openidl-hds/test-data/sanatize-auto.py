
import hashlib
import random
transaction_codes = set()
month_set = set()
year_set = set()
claim_count= 0
policy_count=0
record_count=0
#target record counts
policy_target = 10000
claim_target = 10000

#file configs
source_file = 'auto-sample.txt'
target_file = 'auto-output.txt'

#convert ascII codes to human readable + - keys. 
def ascII_to_human(input):
    value = None
    if '{' in input:
        value = float(input.replace('{', ''))
    elif 'A' in input:
        value = float(input.replace('A', '')) * 1
    elif 'B' in input:
        value = float(input.replace('B', '')) * 2
    elif 'C' in input:
        value = float(input.replace('C', '')) * 3
    elif 'D' in input:
        value = float(input.replace('D', '')) * 4
    elif 'E' in input:
        value = float(input.replace('E', '')) * 5
    elif 'F' in input:
        value = float(input.replace('F', '')) * 6
    elif 'G' in input:
        value = float(input.replace('G', '')) * 7
    elif 'H' in input:
        value = float(input.replace('H', '')) * 8
    elif 'I' in input:
        value = float(input.replace('I', '')) * 9
    elif '}' in input:
        value = float(input.replace('}', '')) * -1
    elif 'J' in input:
        value = float(input.replace('J', '')) * -1
    elif 'K' in input:
        value = float(input.replace('K', '')) * -2

    elif 'L' in input:
        value = float(input.replace('L', '')) * -3

    elif 'M' in input:
        value = float(input.replace('M', '')) * -4

    elif 'N' in input:
        value = float(input.replace('N', '')) * -5

    elif 'O' in input:
        value = float(input.replace('O', '')) * -6

    elif 'P' in input:
        value = float(input.replace('P', '')) * -7

    elif 'Q' in input:
        value = float(input.replace('Q', '')) * -8

    elif 'R' in input:
        value = float(input.replace('R', '')) * -9
    else: 
        value = float(input)
    return value


with open(target_file, 'w') as o:
    with open(source_file,'r') as f:

        lines = f.readlines()
        for line in lines:
            record_count+=1
            print(f'Scanning Record: {record_count}, {policy_count} policy, {claim_count} claim')
      
            line.rstrip()
            #line = line[0:39]+'04'+line[41:]
            transaction_code = line[15]
            if transaction_code == '1' or transaction_code == '8':
                if policy_count < policy_target:
                    #premium
                    #policy
                    policy_identification = line[65:79] 
                    policy_hash= hashlib.sha512(policy_identification.encode()).hexdigest()[-14:]
                    policy = line.replace(policy_identification,policy_hash)
                    #company
                    company_code =policy[5:9]
                    company_hash = hashlib.sha512(company_code.encode()).hexdigest()[-4:]
                    company = policy.replace(company_code,company_hash)[:150] #remove vin/hash company
                    
                    #premium handling
                    premium_amount = ascII_to_human(company[16:26])     
                    if premium_amount <1:
                        positive = -1
                        premium_amount = premium_amount *-1 
                    new_amount = str(round(premium_amount * (random.randint(50,150)*.01 ),2))
                    diff = 10-len(new_amount)
                    zero = ''
                    for i in range(0,diff):
                        zero+='0'
                    final_amount = zero + new_amount
                    if positive < 1:
                        final_amount = '-'+final_amount[1:]                
                    premium = line.replace(str(input), final_amount)

                    
                    o.write(premium)
                    o.write('\n')
                    policy_count+=1
                    print(f'write {record_count}')


            
            if transaction_code == '2' or transaction_code == '3' or transaction_code == '6' or transaction_code == '7':
                if claim_count<claim_target:

                    #loss
                    occurrence_identification = line[65:77] 
                    occurrence_hash= hashlib.sha512(occurrence_identification.encode()).hexdigest()[-12:]
                    occurrence = line.replace(occurrence_identification,occurrence_hash)
                    #company
                    company_code =occurrence[5:9]
                    company_hash = hashlib.sha512(company_code.encode()).hexdigest()[-4:]                    
                    company = occurrence.replace(company_code,company_hash)[:150] #remove vin/hash company

                    #modify dates to year 2k
                    accident_code = company[55:59]
                    accident_month = accident_code[:2]
                    accident_year = str(int('20'+str(int(accident_code[2:])))-20)[2:]                 
                    accident_date = company[:57]+str(accident_year)+company[59:]
                    month_set.add(accident_month)
                    year_set.add(accident_year)

                    #loss amount
                    loss_line = accident_date[16:26]
                    loss_amount = ascII_to_human(loss_line)
                    positive = 1
                    if loss_amount <1:
                        positive = -1
                        loss_amount = loss_amount *-1 
                    new_amount = str(round(loss_amount * (random.randint(50,150)*.01 ),2))
                    diff = 10-len(new_amount)
                    zero = ''
                    for i in range(0,diff):
                        zero+='0'
                    final_amount = zero + new_amount
                    if positive < 1:
                        final_amount = '-'+final_amount[1:]                
                    loss = line.replace(str(loss_line), final_amount)
                    o.write(accident_date)
                    o.write('\n')
                    claim_count+=1
                    print(f'write {record_count}')
            
            if policy_count==policy_target:
                if claim_count==claim_target:
                    break

print(f'claim: {claim_count} policy_count: {policy_count}')


         